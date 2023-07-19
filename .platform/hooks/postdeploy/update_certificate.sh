#!/bin/bash
sleep 60
sudo certbot --nginx --non-interactive --redirect --email khairulanamstud@gmail.com --agree-tos -d $(sudo /opt/elasticbeanstalk/bin/get-config environment -k DOMAIN) --cert-name $(sudo /opt/elasticbeanstalk/bin/get-config environment -k DOMAIN) || echo 'The certificate could not be generated/updated. Initialization will continue'