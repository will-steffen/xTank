package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"golang.org/x/net/websocket"
)

func main() {
	go startWS(":8080")
	startHTTP(":80")
}

func startHTTP(port string) {
	dir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	fmt.Println("Starting HTTP on" + port)
	log.Fatal(http.ListenAndServe(port, http.FileServer(http.Dir(dir+"\\www"))))
}

func startWS(port string) {
	http.Handle("/socket", websocket.Handler(onWsConnect))
	fmt.Println("Starting WS on" + port)
	go broadcastService()
	log.Fatal(http.ListenAndServe(port, nil))
}
