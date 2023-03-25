#!/bin/bash

# Get the MIME types from the environment variable
MIME_TYPES_CONTENT=$MIME_TYPES

# Create the mime.types file
echo "$MIME_TYPES_CONTENT" > /etc/nginx/mime.types
