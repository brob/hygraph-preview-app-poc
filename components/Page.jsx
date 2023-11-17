import { RichText } from '@graphcms/rich-text-react-renderer'
import { useEffect, useState } from 'react'
import Image from 'next/image'
function Hero({state}) {
    console.log({state})
    const { backgroundColor, title, body, image } = state
    let rgba
    if (backgroundColor) {
        rgba = `rgba(${backgroundColor.rgba.r}, ${backgroundColor.rgba.g}, ${backgroundColor.rgba.b}, ${backgroundColor.rgba.a})`
    }
    console.log({rgba})
    return (
        <section style={{backgroundColor: rgba}} className="dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{state.title || "Write a title"}</h1>
            {state.body?.raw && 
                <RichText content={state.body.raw.children || "Write some content"} />}
            
            
        </div>
        {state.image && <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src={state.image.url} alt="mockup" width={state.image.width} height={state.image.height} />
        </div>   }

    </div>
</section>
    )
}

export default function Page({props}) {
    const [state, setState] = useState({props})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setState(props)
        setLoading(false);
    }
    ,[props]
    )

    console.log('in page')
    console.log({state})
    return (<>
        {loading ? 
            <div>Loading...</div> : 
            state?.pageSections?.map( (section, i) => {
            console.log(section)
            return <Hero key={i} state={section} />})}
    </>)
}