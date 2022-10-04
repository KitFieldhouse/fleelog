#!/bin/bash

scp -o ProxyCommand="ssh -W %h:%p kitfield@outland.fnal.gov" ./index.html kitfield@chablis:/usr/local/www/data/ops/kitfield/fleelog/
scp -o ProxyCommand="ssh -W %h:%p kitfield@outland.fnal.gov" ./css/style.css kitfield@chablis:/usr/local/www/data/ops/kitfield/fleelog/css/
scp -o ProxyCommand="ssh -W %h:%p kitfield@outland.fnal.gov" ./js/index.js kitfield@chablis:/usr/local/www/data/ops/kitfield/fleelog/js/