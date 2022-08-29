import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NewTech() {

    return(
        <>
            <div className='technologyname'>
                <label htmlFor="name" className="">Technology Name *</label>
                <input
                    className="inpt"
                    type="text"
                    placeholder='Technology Name'
                    required />
            </div>
        </>
    )
}
