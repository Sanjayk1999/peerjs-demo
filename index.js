var room_id_1 = document.getElementById("peer-id1")
var room_id_2 = document.getElementById("peer-id2")
var lvideo = document.getElementById("l-video")
var user = document.getElementById("username")
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
var p
var camtoggle = false

formdivhide()
form1divhide()
buttonsdiv()
function createpeer(){
		formdivhide()
		p = new Peer(room_id_1.value)
		 p.on('open',(id)=>{
		 	console.log('a peer connected with id ->',id)
		 	getUserMedia({video: true, audio: false},(stream)=>{
		 		local_stream = stream
		 		setLocalStream(stream)
		 		camtoggle = true
		 	},(err)=>{
		 		console.log('error occured')
		 	})
		 })

		 p.on('call',(call)=>{
		 	call.answer(local_stream)
		 	call.on('stream',(stream)=>{
		 		setRemoteStream(stream,call.peer)
		 	})
		 })
}

function connectpeer(){
	form1divhide()
	p = new Peer(user.value)
	p.on('open', (id)=>{
        console.log("Connected with Id: "+id)
        getUserMedia({video: true, audio: false}, (stream)=>{
            local_stream = stream;
            setLocalStream(local_stream)
            camtoggle = true
			// showvideobtndiv()
            let call = p.call(room_id_2.value, stream)
            call.on('stream', (stream)=>{
                setRemoteStream(stream,user.value);
            })
        }, (err)=>{
            console.log(err)
        })

    })
}


function videotoggle(){
	if(camtoggle){
		camtoggle = false
		videoicontoggle()
		var stream = lvideo.srcObject
		var tracks = stream.getTracks()
		tracks[0].stop()
	}
	else{
			camtoggle = true
			videoicontoggle()
	        getUserMedia({video: true, audio: false}, (stream)=>{
	            local_stream = stream;
	            setLocalStream(local_stream)
	            let call = p.call(room_id_2.value, stream)
	            call.on('stream', (stream)=>{
	                setRemoteStream(stream,user.value);
	            })
	        }, (err)=>{
	            console.log(err)
	        })

	}
}




function videoicontoggle(){
	if(camtoggle){
		var videobtnfont = document.getElementById("videobtn-font")
		videobtnfont.setAttribute("class","fas fa-video")
	}
	else{
		var videobtnfont = document.getElementById("videobtn-font")
		videobtnfont.setAttribute("class","fas fa-video-slash")
	}
}



function setLocalStream(stream){
	lvideo.srcObject = stream
	lvideo.muted = true
	lvideo.play()
}



function setRemoteStream(stream,peer_id){

	if(document.getElementById(peer_id)){
		var rvideo = document.getElementById(peer_id)
		rvideo.srcObject = stream
		rvideo.muted = true
		rvideo.play()
	}
	else{
		var rvidiv = document.getElementById('r-video-div')
		var rvideo = document.createElement('video')
		rvideo.setAttribute("id",peer_id)
		rvideo.setAttribute("class","remotevideo")
		rvideo.srcObject = stream
		rvideo.muted = true
		rvideo.play()
		rvidiv.appendChild(rvideo)
	}

}



function connectmeet(){
	document.getElementById("form-div").hidden=false
	document.getElementById("input-div").hidden=true
}
function joinmeet(){
	document.getElementById("form1-div").hidden=false
	document.getElementById("input-div").hidden=true
}
function formdivhide(){
	document.getElementById("form-div").hidden=true
}
function form1divhide(){
	document.getElementById("form1-div").hidden=true
}
function buttonsdiv(){
	document.getElementById("buttons").hidden=true
}
