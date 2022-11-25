import Passwords from '../Passwords';

const Vault = () => {
    return (
        <section>
            <h1>Sus contraseñas</h1>
            <br />
            <Passwords />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Vault
