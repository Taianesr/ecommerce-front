interface CardProps {
    image: string;
    title?: string;
}

export function Card({ image, title = "Ecommerce" }: CardProps) {
    return (
        <div className="card">
            <img
                src={image}
                alt={title}
                className="card-image"
            />
            <h2 className="card-title">{title}</h2>
        </div>
    );
}