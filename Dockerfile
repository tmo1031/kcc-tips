FROM paperist/alpine-texlive-ja:latest
RUN apk update
RUN apk add pandoc
RUN apk add --no-cache curl tar xz
RUN set -eux; \
    LATEST_URL=$(curl -s "https://api.github.com/repos/lierdakil/pandoc-crossref/releases/latest" | grep "browser_download_url.*Linux-X64.tar.xz" | cut -d '"' -f 4); \
    curl -L "${LATEST_URL}" -o pandoc-crossref-Linux.tar.xz; \
    tar -xJf pandoc-crossref-Linux.tar.xz
RUN mv pandoc-crossref /usr/local/bin/
RUN chmod +x /usr/local/bin/pandoc-crossref