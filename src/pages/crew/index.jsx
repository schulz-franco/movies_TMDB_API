import CastMovie from "../../components/cast/castMovie"
import CastList from "../../components/cast/castList"
import useCrew from "../../hooks/useCrew"

import ErrorMessage from "../../components/errorMessage"

const Crew = ()=> {
    
    const { id, title, cast, image, crew, error } = useCrew()

    if (error) return <ErrorMessage code={error["code"]} message={error["message"]} />

    return(
        <>
        {image && <CastMovie image={image[0]} backdrop={image[1]} title={title} id={id} />}
        {(cast || crew) &&
        <div className="cast-lists-container">
            <CastList cast={cast} />
            <div className="cast-crew-container">
                <CastList crew={crew} />
            </div>
        </div>}
        </>
    )
}

export default Crew