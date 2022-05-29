#!/usr/bin/env bash

RED=$(tput setaf 1);
GREEN=$(tput setaf 2);
YELLOW=$(tput setaf 3);
NEUTRAL=$(tput sgr0);
PURPLE=$(tput setaf 5);

PWD=$(pwd);
REPO_ROOT=$(git rev-parse --show-toplevel);

COMPOSE_SERVER_SERVICE_NAME="server-dev";

# get docker compose major version
COMPOSE_MAJOR_VERSION=$(docker-compose -v |  cut -d' ' -f4 | tr "v" " " | xargs | cut -f1 -d".");


if [ "$COMPOSE_MAJOR_VERSION" != "2" ]; then
    printf "\n";
    printf "%40s\n" "${RED}This script requires docker-compose v2. as it relies on the --wait flag. Please upgrade it and try again... ${NEUTRAL}";
    printf "\n";
    return 1;
fi

docker-compose -f docker-compose-dev.yaml up --force-recreate --always-recreate-deps --wait;

if [ "$PWD" != "$REPO_ROOT" ]; then
    printf "\n";
    printf "%40s\n" "${YELLOW}Please run this from the root of the project at $REPO_ROOT ! ${NEUTRAL}";
    printf "%40s\n" "${RED}Won't be execting the script... ${NEUTRAL}";
    printf "\n"
else 
    printf "\n";
    YQ_OUT=$(yq --version);
        
    if [ $? -ne 0 ] ; then
        printf "%40s\n" "${YELLOW}yq is not installed, it's required to read from the docker-compose-dev.yaml file. Installing... ${NEUTRAL}";

        sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64;
        sudo chmod a+x /usr/local/bin/yq;

        YQ_OUT=$(yq --version)
        if [ $? -eq 0 ] ; then
            printf "%40s\n" "${GREEN}yq is installed ${NEUTRAL}";
        else
            printf "%40s\n" "${RED}yq is not installed for some reason. Exit with 1 ${NEUTRAL}";
            return 1;
        fi
    fi

    printf "%40s\n" "${PURPLE}Checking if the containers for app are up!... ${NEUTRAL}";
    
    RUNNING_CONTAINERS=();
    
    STR_APP_CONTAINERS=$(yq '.services|.[].container_name' docker-compose-dev.yaml);
    ARR_APP_CONTAINERS=(${STR_APP_CONTAINERS// / });

    for ELEM in "${ARR_APP_CONTAINERS[@]}"
    do
        if [ $( docker ps -a | grep $ELEM | wc -l ) -gt 0 ]; then
            printf "\n"
            printf "%40s\n" "${GREEN}Container $ELEM exists! ${NEUTRAL}";
            RUNNING_CONTAINERS+=($ELEM)  
            # echo $RUNNING_CONTAINERS 
        else
            printf "\n"
            printf "%40s\n" "${RED}Container $ELEM does not exist... ${NEUTRAL}";
        fi
    done

    if [ ${#RUNNING_CONTAINERS[@]} -eq ${#ARR_APP_CONTAINERS[@]} ]; then
        echo ""
        printf "%40s\n" "${GREEN}All containers are running, spinning up the web browser... ${NEUTRAL}";

        SERVER_PORT=$(yq e ".services.$COMPOSE_SERVER_SERVICE_NAME.expose[0]" < "./docker-compose-dev.yaml")
        
        for ELEM in 1 2 3 4 5 6 7 8 9 10
        do
            if [ $(docker-compose -f docker-compose-dev.yaml logs | grep "Listening on" | wc -l) -eq 1 ]; then
                printf "%40s\n" "${YELLOW}Server is up! ${NEUTRAL}";
                if [[ -n "$IS_WSL" || -n "$WSL_DISTRO_NAME" ]]; then
                    printf "\n"
                    printf "%40s\n" "${PURPLE}Running this from WSL so will use wsl-open.sh and not xdg-open...${NEUTRAL}";

                    . ./server/script/wsl-open.sh http://localhost:$SERVER_PORT >/dev/null 2>&1
                else
                    printf "\n"
                    printf "%40s\n" "${PURPLE}This is not WSL, lets use xdg-open to open the browser...${NEUTRAL}";
                    printf "\n"
                    xdg-open http://localhost:$SERVER_PORT
                fi
                break
            else 
                printf "%40s\n" "${YELLOW}Server is not up yet, will try again in a second${NEUTRAL}";
                sleep 1
            fi
        done

        printf "\n"
        printf "%40s\n" "${GREEN}The app has been opened on the default browser, attaching to docker compose logs...${NEUTRAL}";
        printf "\n"
        docker-compose -f docker-compose-dev.yaml logs -f -t
    else
        echo "Running containers are: ${RUNNING_CONTAINERS[@]}"
        echo "Some containers are not running, cannot spin up web browser..."
        RUNNING_CONTAINERS=()
    fi
fi



