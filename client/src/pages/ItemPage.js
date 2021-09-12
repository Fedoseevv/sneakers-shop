import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../authContext/authContext'
import { useHttp } from '../hooks/http.hook'
import Spinner from '../spinner'
import {SneakerCard} from '../sneakerCard/sneakerCard'

const ItemPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [sneaker, setSneaker] = useState(null)
    const sneakerId = useParams().id

    const getSneaker = useCallback(async () => {
        try {
            console.log(sneakerId)
            const fetched = request(`/api/sneakers/${sneakerId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setSneaker(fetched)
        } catch(e) {}

    }, [token, sneakerId, request])

    useEffect(() => {
        getSneaker()
    }, [getSneaker])

    if (loading) {
        return <Spinner/>
    }

    console.log(sneaker)
    return (
        <>
            { !loading && sneaker && <SneakerCard sneaker={sneaker}/>}
        </>
    )

}
export default {ItemPage}

