export const PRODUCT_CATEGORIES = [
    {
        label: "Novedades",
        value: "novedades" as const,
        featured: [
            {
                name: "Monitor Full HD",
                href: '#',
                imageSrc: '/nav/Novedades/monitor.png'
            },
            {
                name: "Ratón",
                href: '#',
                imageSrc: '/nav/Novedades/raton.png'
            },
            {
                name: "Teléfono",
                href: '#',
                imageSrc: '/nav/Novedades/telefono-inteligente.png'
            },
        ]
    },
    {
        label: "Ofertas",
        value: "ofertas" as const,
        featured: [
            {
                name: "Auriculares",
                href: '#',
                imageSrc: '/nav/Ofertas/auricular.png'
            },
            {
                name: "Web Cam",
                href: '#',
                imageSrc: '/nav/Ofertas/camara-web.png'
            },
            {
                name: "Micrófono",
                href: '#',
                imageSrc: '/nav/Ofertas/microfono.png'
            }
        ]
    }
]