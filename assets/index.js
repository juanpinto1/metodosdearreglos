document.addEventListener("DOMContentLoaded", () => {
    const nuevatareainput = document.querySelector("input");
    const tbody = document.querySelector("tbody");
    const btn = document.querySelector("button");
    const [totalspan, realizadasspan, pendientesspan] = document.querySelectorAll(".resumen span");
    const tareas = [];
    let resumen = {
        total: 0,
        realizadas: 0,
        pendientes: 0,
    };
    btn.addEventListener("click", () => {
        const {value: nuevatarea} = nuevatareainput;
        if(nuevatarea){
            addtask(nuevatarea);
            refresh();
        }
        else alert("debe escribir la descripcion de la nueva tarea");
    });
    const addtask = (nuevatarea) => {
        const id=Math.floor(Math.random() * 99);
        const tarea= {
            id,
            tarea: nuevatarea,
            check: false
        };
        tareas.push(tarea);
        nuevatareainput.value ="";
    };
    const checkinput = (id) => {
        const tarea =tareas.find((tarea)=> tarea.id === id);
        const {check} = tarea;
        tarea.check = !check;
        refresh();
    };
    const editTask = (id) => {
        const tarea = tareas.find((tarea) => tarea.id === id);
        const { tarea: tareaDescripcion } = tarea;
        const nuevaDescripcion = prompt("Editar tarea:", tareaDescripcion);
        tarea.tarea = nuevaDescripcion;
        refresh();
    };
    
    const deleteTask = (id) => {
        const decision = confirm("¿Seguro que quieres eliminar esta tarea?");
        if (decision) {
            const index = tareas.findIndex((tarea) => tarea.id === id);
            tareas.splice(index, 1);
            refresh();
        }
    };
    
    const fillTable = () => {
        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = ''; // Limpiamos el contenido previo para evitar duplicados
        
        tareas.forEach(({ id, tarea, check }) => {
            const row = document.createElement('tr');
            
            const idCrear = document.createElement('td');
            idCrear.textContent = id;
            row.appendChild(idCrear);
            
            const tareaCrear = document.createElement('td');
            tareaCrear.textContent = tarea;
            
            row.appendChild(tareaCrear);
            
            const deleteEditCrear = document.createElement('td');
            deleteEditCrear.classList.add('x-delete');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = check;
            checkbox.addEventListener('change', () => checkinput(id));
            deleteEditCrear.appendChild(checkbox);
            
            const editIcon = document.createElement('span');
            editIcon.textContent = '✎';
            editIcon.classList.add('icon');
            editIcon.addEventListener('click', () => editTask(id));
            deleteEditCrear.appendChild(editIcon);
            
            const deleteIcon = document.createElement('span');
            deleteIcon.textContent = '✖';
            editIcon.classList.add('icon');
            deleteIcon.addEventListener('click', () => deleteTask(id));
            deleteEditCrear.appendChild(deleteIcon);
            
            row.appendChild(deleteEditCrear);
            
            taskTableBody.appendChild(row);
        });
    };
    const clearTable =()=>(tbody.innerHTML="");
    
    const calculateResumen = () => {
        const total = tareas.length;
        const realizadas = tareas.filter(({ check }) => check).length;
        const pendientes = total - realizadas;
        const newResumen = { total, realizadas, pendientes };
        resumen = { ...newResumen};
    };
    
    const updateResumen = () => {
        const { total, realizadas, pendientes } = resumen;
        totalspan.innerText = total;
        realizadasspan.innerText = realizadas;
        pendientesspan.innerText = pendientes;
    };
    const refresh = () => {
        clearTable();
        fillTable();
        calculateResumen();
        updateResumen();
    };
    });
    