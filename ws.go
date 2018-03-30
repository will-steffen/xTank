package main

import (
	"fmt"
	"log"

	"golang.org/x/net/websocket"
)

var players = make([]*Player, 0)

func onWsConnect(wsConn *websocket.Conn) {
	defer wsConn.Close()
	player := Player{
		id:         len(players),
		connection: wsConn,
	}
	addPlayer(&player)
}

func addPlayer(p *Player) {
	players = append(players, p)
	websocket.JSON.Send(p.connection, Broadcast{
		BroadcastType: broadcastTypeOpen,
		ID:            p.id,
	})
	p.listen()
}

func (p *Player) listen() {
	for {
		var u Update
		if err := websocket.JSON.Receive(p.connection, &u); err != nil {
			log.Println(err)
			break
		}

		b := Broadcast{
			BroadcastType: broadcastTypeUpdate,
			Message:       u.Message,
			Bullet:        u.Bullet,
		}
		broadcast(b)
	}
}

func broadcast(b Broadcast) {
	for _, p := range players {
		websocket.JSON.Send(p.connection, b)
	}
}

func onWsConnect2(ws *websocket.Conn) {
	for {
		// allocate our container struct
		var m message

		// receive a message using the codec
		if err := websocket.JSON.Receive(ws, &m); err != nil {
			log.Println(err)
		}

		fmt.Println("Received message:", m.Message+": ")

		// send a response
		m2 := message{"Thanks for the message!"}
		if err := websocket.JSON.Send(ws, m2); err != nil {
			log.Println(err)
			break
		}
	}
}
