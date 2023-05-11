# Documentación rutas del maldtio back

## Rutas del modelo Event

### Create Event
````
POST
http://localhost:3001/events/eventcreate
expected: JSON por body
{
	"name":"Megajodita2",
	"image":"https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
	"description":"en la pera",
	"date":"2024-09-20",
	"hour":"02:00:00",
	"venue":"Calle Falsa 456",
	"producer":"The Bow",
	"userId":"33bf78c3-51b7-41fc-a5b3-a85b7161ccc4"
}
recived:
{
	"id": "5f366c0a-36c0-4f3f-ae4a-c21e7114fd53",
	"status": true,
	"image": "https://res.cloudinary.com/dv8oxhsmk/image/upload/v1683816264/vpokk5tyxuxt6osewvho.jpg",
	"description": "en la pera",
	"date": "2024-09-20T03:00:00.000Z",
	"hour": "02:00:00",
	"venue": "Calle Falsa 456",
	"producer": "The Bow",
	"userId": "48ee4976-c98e-4fca-b4d9-7431ee7c923e",
	"name": "Megajodita2",
	"updatedAt": "2023-05-11T14:44:21.171Z",
	"createdAt": "2023-05-11T14:44:21.171Z",
	"UserId": null
}
````