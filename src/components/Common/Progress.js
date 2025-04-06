import progress_img from "../../utils/images/icons/progress.svg"
import style from  "../../utils/css/progress.module.css"

export default function Progress() {
    return (
        <div className={style.progressContainer+" text-center"}>
            <img src={progress_img||""} alt="Loading..." className={style.progressImg} />
            {/* <h5 className="mt-3">Loading...</h5> */}
        </div>
    );
}