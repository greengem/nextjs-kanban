export default function PageHeading({ title } : { title:string }) {
    return (
        <h1 className="text-4xl tracking-tight mb-7 text-zinc-200">{title}</h1>
    )
}
