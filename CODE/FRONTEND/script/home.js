//let listTarea;
const colors = {
    WORK: "primary",
    SCHOOL: "secondary",
    HOME: "success",
    URGENT: "warning",
    PENDING: "danger",
    FRIENDS: "light",
    FAMILY: "info"
}

function tareasListToHTML(listTarea){
    //console.log(listTarea);
    //listArray = [listTarea]
    document.getElementById("tareas").innerHTML = listTarea.map(tarea =>{
        let users = tarea.users.join(", ");
        let tags = "";
        let colorTag;
        //console.log(tarea.tags);
        for(let i = 0; i < tarea.tags.length; i++){
            colorTag = tarea.tags[i];
            //console.log(colors[colorTag], tarea.tags[i]);
            tags+=`<div class="badge badge-${colors[colorTag]} ml-2"
            >
                ${tarea.tags[i]}
            </div>`;
        }
        //console.log(tags);
        return tareaToHTML(tarea, users, tags);
    }).join("");
}

function tareaToHTML(tarea, users, tags){
    //html de la tarea
    return (`
    <li class="list-group-item">
    <!--color de tarea: bg-->
    <div
        class="todo-indicator bg-primary"
    ></div>
    <div class="widget-content p-0">
        <div
            class="widget-content-wrapper"
        >
            <div
                class="widget-content-left mr-2"
            >
                <div
                    class="custom-checkbox custom-control"
                >
                    <input
                        class="custom-control-input"
                        id="task${tarea.id}"
                        type="checkbox"
                        onclick="tareaCompletada()"
                    />
                    <label
                        class="custom-control-label"
                        for="task${tarea.id}"
                        >&nbsp;</label
                    >
                </div>
            </div>
            <div
                class="widget-content-left"
            >
                <div
                    class="widget-heading"
                >
                ${tarea.name}
                </div>
                <!--autor-->
                <div
                    class="widget-subheading"
                >
                    ${users}
                    <!--etiquetas color: badge-->
                    ${tags}
                </div>
                <div
                    class="widget-subheading"
                >
                    ${tarea.date}
                </div>
            </div>
            <div
                class="widget-content-right"
            >
                <!--editar y eliminar tareas-->
                <button
                    class="border-0 btn-transition btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#editarTarea"
                    onclick="getUsers('selectUsersEditar', 'addselectUsersEditar')"
                >
                    <i
                        class="fa fa-edit"
                    ></i>
                </button>
                <button
                    class="border-0 btn-transition btn btn-outline-danger"
                    data-toggle="modal"
                    data-target="#eliminarTarea"
                >
                    <i
                        class="fa fa-trash"
                    ></i>
                </button>
            </div>
        </div>
    </div>
</li>
    `)
}

async function loadTareasJSON(){
    let url = "http://localhost:3000/api/tarea"
    let resp = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'x-auth-user': localStorage.token
        }
    })
    if (resp.ok) {
        let toHtml = await resp.json();
        //console.log(toHtml);
        tareasListToHTML(toHtml);
    } else {
        document.getElementById("alerts").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
        <strong>Error!</strong> Surgio un error al momento de cargar los datos.
      </div>`
    }
}


async function deleteTarea(id){
    let url = "http://localhost:3000/api/tarea/"+ id
    let resp = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'x-auth-user': localStorage.token
        }
    })
    if (resp.ok) {
        let toHtml = await resp.json();
        //console.log(toHtml);
        tareasListToHTML(toHtml);
    } else {
        if(resp.status == 404){
            document.getElementById("alerts").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> No se puede eliminar esa tarea.
            </div>`
        }else{
            document.getElementById("alerts").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> Surgio un error.
            </div>`
        }
    }
}

function editTarea(){
    
}

async function postTarea(datos){
    let url = "http://localhost:3000/api/tarea"
    let resp = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    if (resp.ok) {
        /*
        document.getElementById("modalalertsM").innerHTML = `<div class="alert alert-success" style="text-align: center;">
   <strong>Generado!</strong> Usuario generado.
 </div>`;
        setTimeout(() => {
            document.getElementById("modalalertsM").innerHTML = ``;
            window.location.href = "usuarios.html";
        }, 5000);
        */
        window.location.href = "home.html";
        alert("¡Registro exitoso!");
    } else {
        if(resp.status == 400){
            document.getElementById("modalalertsM").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> El usuario ya se ha registrado antes. Intenta con otro nombre o correo.
            </div>`;
            setTimeout(() => {
                document.getElementById("modalalertsM").innerHTML = ``
            }, 5000);
        }else{
            document.getElementById("modalalertsM").innerHTML = `<div class="alert alert-danger" style="text-align: center;">
            <strong>Error!</strong> Surgio un error al momento de cargar los datos. Vuelve a intentarlo
            </div>`;
            setTimeout(() => {
                document.getElementById("modalalertsM").innerHTML = ``
            }, 5000);
        }
        
    }
}




const agregarTarea = () => {
    
};


const editarTarea = () => {
    
};


const completeTarea = () => {
    
};