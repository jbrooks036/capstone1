#!/bin/bash

    mongoimport --jsonArray --drop --db $1 --collection users --file ./users.json
    mongoimport --jsonArray --drop --db $1 --collection projects --file ./projects.json

