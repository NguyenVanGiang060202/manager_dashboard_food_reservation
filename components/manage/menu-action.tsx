import { Button } from '@/components/ui/button'
import { Edit, Lock, Trash2, Unlock } from 'lucide-react'
import React from 'react'

export default function MenuAction() {
    return (
        <div className="flex justify-center items-center gap-4">
            <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
            </Button>
            <Button variant="outline">
                <Lock className="mr-2 h-4 w-4" />
                Deactivate
            </Button>
            <Button variant="outline">
                <Unlock className="mr-2 h-4 w-4" />
                Activate
            </Button>
            <Button>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </Button>
        </div>
    )
}
