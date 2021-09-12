import React, {useCallback, useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../authContext/authContext'
import { useHttp } from '../hooks/http.hook'
import { SneakerCard } from '../sneakerCard/sneakerCard'
import Spinner from '../spinner'

// import './itemPage.css'

export const SneakersItem = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [sneaker, setSneaker] = useState(null)
    const sneakerId = useParams().id // ключ берем из роутов, мы сами его так назвали
    
    const getSneaker = useCallback(async () => {
        try {
            const fetched = await request(`/api/sneakers/${sneakerId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setSneaker(fetched)
        } catch(e) {}   

    }, [token, sneakerId, request])

    useEffect(() => {
        getSneaker()
    }, [getSneaker])

    if (loading) {
        return <Spinner/>
    }

    return (
        <>
            { !loading && sneaker && <SneakerCard sneaker={sneaker} /> }
        </>
    )
}