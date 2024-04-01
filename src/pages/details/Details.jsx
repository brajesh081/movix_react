import React from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
import './style.scss';


const Details = () => {

  return (
    <>
    <DetailsBanner />
    <div>Details</div>
    </>
  )
}

export default Details