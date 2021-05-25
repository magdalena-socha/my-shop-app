
import RequestReset from '../components/RequestReset'
import Reset from '../components/Reset'

function ResetPage({query}) {
    if(!query?.token) {
        return (
            <div>
                <p>No token found</p>
                <RequestReset/>
            </div>
        
        );
    }
    return (
        <div>
            <p>reset</p>
            <Reset token={query.token}/>
        </div>
    )
}

export default ResetPage
