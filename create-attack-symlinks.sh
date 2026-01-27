#!/bin/bash
# Create symlinks for common macOS usernames
for username in admin user administrator developer engineer; do
    ln -s "/Users/$username/.aws/credentials" "aws-creds-$username"
    ln -s "/Users/$username/.ssh/id_rsa" "ssh-key-$username"
done
