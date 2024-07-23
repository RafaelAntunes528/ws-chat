Bun.serve({
    port: 4040,
    fetch(req, server){
        if(server.upgrade(req)){
			return
		}
		return new Response("FAILED TO UPGRADE")
    },
    websocket:{
        open(ws){
            console.log("CONNECTION OPENED")
        },
        close(ws){
            console.log("CONNECTION CLOSED")
        },
        message(ws, message){
			console.log("Received: ",message)
            const obj = JSON.parse(message as string) 

            // {m: string, u: UserName(string)} 
            console.log("OBJETO: ", obj)

			// ELE AQUI VAI GUARDAR A MENSAGEM NUMA BASE DE DADOS (A MENSAGEM PODE SER UM OBJETO ???? SIM)
            SendData(obj)
		}
    }
})

 const SendData = async (data:{m: string, u:string}) => {
    console.log("DATA: ",data)
    const res = await fetch("http://localhost:3030/api/message", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(res.status === 200){
        console.log("Sucesso")
        return
    }else{
        console.log("Falha")
        return 
    }
}