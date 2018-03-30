package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"golang.org/x/net/websocket"
)

func main() {
	go startWS(":8081")
	startHTTP(":8080")
}

func startHTTP(port string) {
	dir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	log.Fatal(http.ListenAndServe(port, http.FileServer(http.Dir(dir+"\\www"))))
}

func startWS(port string) {
	http.Handle("/socket", websocket.Handler(onWsConnect))
	log.Fatal(http.ListenAndServe(port, nil))
}
