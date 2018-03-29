package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"golang.org/x/net/websocket"
)

func main() {
	//startWS(":8081")
	startHTTP(":8081")
}

func startHTTP(port string) {
	dir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	log.Fatal(http.ListenAndServe(port, http.FileServer(http.Dir(dir+"\\www"))))
}

func startWS(port string) {
	http.Handle("/socket", websocket.Handler(socket))
	log.Fatal(http.ListenAndServe(port, nil))
	/*
		ws = new WebSocket("ws://localhost:8081/socket");
		ws.send(JSON.stringify({message: "e ae!"}))
		ws.onmessage = function(event) {
			var m = JSON.parse(event.data);
			console.log("Received message", m.message);
		}
	*/
}

type message struct {
	// the json tag means this will serialize as a lowercased field
	Message string `json:"message"`
}

func socket(ws *websocket.Conn) {
	for {
		// allocate our container struct
		var m message

		// receive a message using the codec
		if err := websocket.JSON.Receive(ws, &m); err != nil {
			log.Println(err)
		}

		log.Println("Received message:", m.Message)

		// send a response
		m2 := message{"Thanks for the message!"}
		if err := websocket.JSON.Send(ws, m2); err != nil {
			log.Println(err)
			break
		}
	}
}
