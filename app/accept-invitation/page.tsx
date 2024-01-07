export default function AcceptInvitation({
    searchParams
} : {
    searchParams: { token?: string };
}) {
    const token = searchParams.token;

    return (
        <main className="grow">
            <h1>Accept Invite page</h1>
            <p>Token result: {token}</p>
        </main>
    )
}