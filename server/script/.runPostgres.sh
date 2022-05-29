#!/bin/bash


RED=$(tput setaf 1);
GREEN=$(tput setaf 2);
YELLOW=$(tput setaf 3);
NEUTRAL=$(tput sgr0);
PURPLE=$(tput setaf 5);

LINUX_USER=$(whoami)
DEFAULT_USER_DBPASS=$LINUX_USER"dbpass123"
POSTGRES_DBPASS="postgres"

printf "%40s\n" "${PURPLE}Checking if postgresql service is running ${NEUTRAL}";

service postgresql status
PG_SERVICE_STATUS_CODE=$?

if [ $PG_SERVICE_STATUS_CODE -eq 1 ] ; then
 printf "%40s\n" "${YELLOW}Postgresql not installed, installing... ${NEUTRAL}";
 sudo apt update
 sudo apt install postgresql postgresql-contrib
 
elif [ $PG_SERVICE_STATUS_CODE -eq 3 ] ; then
 printf "%40s\n" "${YELLOW}Postgresql not running, starting... ${NEUTRAL}";
    sudo service postgresql start
else
 printf "%40s\n" "${GREEN}Postgresql is running ${NEUTRAL}";
fi

printf "%40s\n" "${PURPLE}Checking psql command status ${NEUTRAL}";

vartest=$(psql -d $LINUX_USER -c 'SELECT 1+1')

PSQL_STATUS_CODE=$?
if [ $PSQL_STATUS_CODE -eq 2 ]; then
    printf "%40s\n" "${YELLOW}Psql user/db does not exist for ${LINUX_USER}, have to create it... ${NEUTRAL}";
    
    printf "%40s\n" "${PURPLE}Elevating to SU to run an Interactive psql with user postgres and creating role";
    printf "%40s\n" " ${LINUX_USER} with the default password <username>dbpass123 Please change this later for security ${NEUTRAL}";
    # sudo su - postgres
    sudo su - postgres <<HERE        
        psql -U postgres
        create role $LINUX_USER WITH LOGIN PASSWORD '$DEFAULT_USER_DBPASS';
        create database $LINUX_USER with owner $LINUX_USER;
        
        ALTER USER postgres WITH PASSWORD '$POSTGRES_DBPASS';
HERE
else
    printf "%40s\n" "${GREEN}Psql user/db exists for ${LINUX_USER} ${NEUTRAL}";
fi


printf "%40s\n" "${PURPLE}Postgresql has been set up on this machine (hopefully anyways) ${NEUTRAL}";


printf "%40s\n" "${PURPLE}Please add the below line to the prisma specific env file inside the prisma/.env file. ${NEUTRAL}";

CONNECTION_STRING=DATABASE_URL="postgresql://postgres:$POSTGRES_DBPASS@localhost:5432/$LINUX_USER?schema=public"
printf "%40s\n" "${NEUTRAL}${CONNECTION_STRING}${NEUTRAL}";

# printf "%40s\n" "${YELLOW}Remember: Its a best practice to use different DBs for test/dev/prod environments, please create multiple dbs manually. ${NEUTRAL}";
