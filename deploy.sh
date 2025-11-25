#!/bin/bash
echo "Deploying to Surge.sh..."
echo "If this is your first time, you will be asked to create an account (email/password)."
echo "Then, you can press Enter to accept the random domain or type your own."
npx surge ./
