/* Eventos de Google Analytics. La etiqueta base (G-W3YY8VCQ1C) va inline en el <head> de cada página.
   Acá solo se miden los contactos: clic a WhatsApp, teléfono y mail. */
(function () {
    function enviar(nombre, extra) {
        if (typeof window.gtag !== 'function') return;
        var p = { page_location: location.href };
        for (var k in extra) p[k] = extra[k];
        window.gtag('event', nombre, p);
    }
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        var h = a.getAttribute('href') || '';
        if (h.indexOf('wa.me/') !== -1) enviar('clic_whatsapp', { link_url: h.split('?')[0] });
        else if (h.indexOf('tel:') === 0) enviar('clic_telefono', {});
        else if (h.indexOf('mailto:') === 0) enviar('clic_mail', {});
    }, true);
    /* La ficha de presupuesto abre WhatsApp con window.open, no con un enlace. */
    var abrir = window.open;
    window.open = function (url) {
        if (typeof url === 'string' && url.indexOf('wa.me/') !== -1) enviar('clic_whatsapp', { link_url: url.split('?')[0], origen: 'ficha' });
        return abrir.apply(window, arguments);
    };
})();
