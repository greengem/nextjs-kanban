export default function PageHeading({ title } : { title:string }) {
    return (
        <h1 className="text-4xl tracking-tight mt-3 mb-7">{title}</h1>
    )
}
