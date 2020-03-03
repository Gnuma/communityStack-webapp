import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback
} from "react";
import { Category, Topic } from "../utils/types";
import * as endpoints from "../utils/endpoints";
import ChooseTopicModalComponent from "./ChooseTopicModalComponent";
import axios from "axios";
import ContributeModalLayout from "../layouts/ContributeModalLayout";

interface ModalComponentProps {}

const ModalComponent: FunctionComponent<ModalComponentProps> = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(1);
  const [topic, setTopic] = useState(1);
  let category_nonstate: number = 1;
  let toShow: any;

  const chooseCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(2);
    setCategory(category_nonstate);
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    category_nonstate = (e.target.value as unknown) as number;
  };

  const chooseTopic = (id: number) => {
    setTopic(id);
    setPage(3);
  };

  const contribute = async (input: any) => {
    if (
      input.hasOwnProperty("link") &&
      input.hasOwnProperty("email") &&
      input.hasOwnProperty("username")
    ) {
      axios.post(endpoints.TUTORIALS_RETRIEVE, {
        link: input.link,
        email: input.email,
        username: input.username,
        topic: topic
      }).then(() => {setPage(4)}).catch(() => {setPage(5)});
    }else{
      alert("Completa i campi!");
    }
  };

  const CategoryChoiceComponent: FunctionComponent<{}> = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      const getCategories = async () => {
        let c = (await axios.get(endpoints.CATEGORIES_RETRIEVE)).data;
        setCategories(c);
      };
      getCategories();
    }, []);

    return (
      <div className="choice-div">
        <form className="choice-form" onSubmit={chooseCategory}>
          <div className="radio-buttons">
            {(categories as Category[]).map(c => {
              return (
                <>
                  <label>{c.name}</label>
                  <input
                    type="radio"
                    onChange={handleRadio}
                    name="category"
                    value={c.id}
                  />
                </>
              );
            })}
          </div>
          <input type="submit" value="Choose" />
        </form>
      </div>
    );
  };

  if (page === 1) {
    toShow = <CategoryChoiceComponent />;
  } else if (page === 2) {
    toShow = (
      <ChooseTopicModalComponent data={category} callback={chooseTopic} />
    );
  } else if (page == 3) {
    toShow = <ContributeModalLayout callback={contribute} />;
  }else if (page == 4){
    toShow = (<div><span>Inviato</span></div>)
  }else if(page == 5){
    toShow = (<div><span>Erroe</span></div>)
  }

  return toShow;
};

export default ModalComponent;
