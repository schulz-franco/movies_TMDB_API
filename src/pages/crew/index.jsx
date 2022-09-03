import CastMovie from "../../components/cast/castMovie"
import CastList from "../../components/cast/castList"
import useCrew from "../../hooks/useCrew"

const Crew = ()=> {
    
    const { id, title, cast, image, crew } = useCrew()

    return(
        <>
        {image && <CastMovie image={image[0]} backdrop={image[1]} title={title} id={id} />}
        <CastList cast={cast} />
        <CastList crew={crew} />
        </>
    )
}

export default Crew