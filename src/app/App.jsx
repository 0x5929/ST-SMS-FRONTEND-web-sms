import Styles from './styles'


export default function App({ Link, Outlet }) {

    return (
        <>
            <Styles.Box>
                    <Styles.Header Link={Link} />
                    <Styles.BackToTopButton />
            </Styles.Box>
            <Outlet />
        </>
    );
}

