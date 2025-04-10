'use client'

import { useLinkStatus } from 'next/link'
import { Loader } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/shared/components/ui/tooltip'

export default function LoadingIndicator() {
    const { pending } = useLinkStatus()
    return pending ? (
        <Tooltip>
            <TooltipTrigger>
                <Loader className='w-4 h-4 animate-spin' />
            </TooltipTrigger>
            <TooltipContent>
                <p>Loading...</p>
            </TooltipContent>
        </Tooltip>
    ) : null
}