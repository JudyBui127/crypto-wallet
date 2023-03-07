import React, { FC, useEffect, useRef } from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import styles from './MetamaskIcon.module.scss';
import Jazzicon from '@metamask/jazzicon'
import { useAuth } from '../../auth';
import { Box } from '@mui/material';

const ModelViewer = require("@metamask/logo");

export default function MetamaskIcon({ size, diameter = size }: { size: number; diameter?: number }) {
  const ref = useRef<HTMLDivElement>()

  // const { account } = useActiveWeb3React()
  const {wallet } = useAuth()
  useEffect(() => {
    if (wallet && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(diameter, parseInt(wallet.getAddress().slice(2, 10), size)))
    }
  }, [wallet, size])
  return <Box display='flex' ref={ref as any} />
}