#!/bin/bash

nvm use 24
vitepress build docs
rsync -azv docs/.vitepress/dist/ r46@arch:/home/r46/rees46.ru/help/