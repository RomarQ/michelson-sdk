#!/bin/sh

CURRENT_DIR=$(dirname $0)
BUILD_FOLDER=_build

clean() {
    rm -rf "$BUILD_FOLDER"
}

bootstrap() {
    mkdir "$BUILD_FOLDER"
    # Create mockup node
    "$CURRENT_DIR/../tezos-binaries/tezos-client" \
    --protocol ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK \
    --base-dir "$BUILD_FOLDER/mockup" \
    --mode mockup \
    create mockup
}

# Main
clean
bootstrap
