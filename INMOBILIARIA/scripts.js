document.addEventListener('DOMContentLoaded', function() {
    const registrarPropiedadForm = document.getElementById('registrarPropiedadForm');
    const transaccionForm = document.getElementById('transaccionForm');
    const generarReporteButton = document.getElementById('generarReporte');
    const reporteResultado = document.getElementById('reporteResultado');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const confirmarTransaccionButton = document.getElementById('confirmarTransaccion');
    const navLinks = document.querySelectorAll('.nav-link');

    let propiedades = [];
    let transacciones = [];
    let transaccionPendiente = null;

    function toggleModal() {
        modal.classList.toggle('show-modal');
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    function showSection(targetId) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = event.target.getAttribute('data-target');
            showSection(targetId);
        });
    });

    registrarPropiedadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const tipoPropiedad = event.target.tipoPropiedad.value;
        const ubicacion = event.target.ubicacion.value;
        const precio = parseFloat(event.target.precio.value);
        const propiedadID = 'P' + (propiedades.length + 1);
        
        const nuevaPropiedad = {
            propiedadID,
            tipoPropiedad,
            ubicacion,
            precio
        };
        
        propiedades.push(nuevaPropiedad);
        alert('Propiedad registrada con ID: ' + propiedadID);
        registrarPropiedadForm.reset();
    });

    transaccionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const propiedadID = event.target.propiedadID.value;
        const tipoTransaccion = event.target.tipoTransaccion.value;
        const famoso = event.target.famoso.value;

        const propiedad = propiedades.find(p => p.propiedadID === propiedadID);

        if (!propiedad) {
            alert('Propiedad no encontrada');
            return;
        }

        transaccionPendiente = {
            propiedadID,
            tipoTransaccion,
            famoso,
            fecha: new Date().toLocaleDateString(),
            precio: propiedad.precio
        };

        toggleModal();
    });

    confirmarTransaccionButton.addEventListener('click', function() {
        transacciones.push(transaccionPendiente);
        alert('Transacción realizada');
        transaccionForm.reset();
        toggleModal();
    });

    closeButton.addEventListener('click', toggleModal);
    window.addEventListener('click', windowOnClick);

    generarReporteButton.addEventListener('click', function() {
        let reporteHTML = '<h3>Reporte de Transacciones</h3>';
        reporteHTML += '<ul>';

        transacciones.forEach(transaccion => {
            reporteHTML += `<li>${transaccion.tipoTransaccion} de la propiedad ${transaccion.propiedadID} por ${transaccion.famoso} el ${transaccion.fecha} por un valor de ${transaccion.precio}</li>`;
        });

        reporteHTML += '</ul>';
        reporteResultado.innerHTML = reporteHTML;
    });
});
