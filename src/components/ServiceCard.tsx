import React from "react"

type ServiceCardProps = {
    name: string
    description: string
    price: number
    onBook?: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, onBook }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">{description}</p>
            <p className="text-gray-800 font-semibold mb-4">${price}</p>
            {onBook && (
                <button
                    onClick={onBook}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Book Now
                </button>
            )}
        </div>
    )
}

export default ServiceCard
