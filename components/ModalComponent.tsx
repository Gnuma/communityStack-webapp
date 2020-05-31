import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { Category, Topic } from "../utils/types";
import * as endpoints from "../utils/endpoints";
import ChooseTopicModalComponent from "./ChooseTopicModalComponent";
import axios from "axios";
import ContributeModalLayout from "../layouts/ContributeModalLayout";
import SearchLayout from "../layouts/SearchLayout";
import * as colors from "../utils/colors";
import { createTopicSearcher } from "../utils/search_index";
import update from "immutability-helper";
import CategoriesMenu from "./CategoriesMenu";
import Button from "./Button";
import Logo from "./Logo";

interface PageMeta {
  title: string;
  subOption?: string;
}

interface ModalComponentProps {
  closeModal: () => void;
}

const ModalComponent: FunctionComponent<ModalComponentProps> = ({
  closeModal
}) => {
  const [pageState, setPageState] = useState(0);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get(endpoints.CATEGORIES_RETRIEVE)
      .then(res => setCategories(res.data))
      .catch();
  }, []);

  const modifyPageState = (isIncrement: boolean) =>
    setPageState(ps =>
      Math.max(Math.min(PAGES_META.length - 1, ps + (isIncrement ? 1 : -1)), 0)
    );

  const onSelectCategory = (category: Category) => {
    setTopics([]);
    modifyPageState(true);
    axios
      .get(endpoints.TOPICS_RETRIEVE + category.id)
      .then(res => setTopics(res.data))
      .catch(err => console.log(err));
  };

  const onSelectTopic = (topic: Topic) => {
    console.log(topic);
    modifyPageState(true);
  };

  const onComplete = () => {};

  const getContent = () => {
    switch (pageState) {
      case 0:
        return (
          <CategoryModalPage data={categories} onSelect={onSelectCategory} />
        );

      case 1:
        return <TopicModalPage data={topics} onSelect={onSelectTopic} />;

      case 2:
        return <InfoModalPage onComplete={onComplete} />;

      default:
        return null;
    }
  };

  const pageMeta = PAGES_META[pageState];
  return (
    <div className="content-container">
      <div className="modal-header">
        {pageState > 0 && (
          <button
            onClick={() => modifyPageState(false)}
            style={{ marginRight: 20 }}
          >
            <img src="/media/chevron-left.svg" alt="Exit" />
          </button>
        )}
        <h3
          className="title"
          style={{
            textAlign: "left",
            flex: 1,
            padding: 0,
            margin: 0,
            verticalAlign: "text-top"
          }}
        >
          {pageMeta.title}
        </h3>
        <button onClick={closeModal}>
          <img src="/media/exit-dark.svg" alt="Exit" />
        </button>
      </div>
      <div className="modal-content">{getContent()}</div>
      <style jsx>{`
        .content-container {
          width: 100%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .modal-header img {
          height: 20px;
        }
        .modal-header > button:hover {
          cursor: pointer;
        }
        .modal-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default ModalComponent;

interface CategoryModalPageProps {
  onSelect: (category: Category) => void;
  data: Category[];
}

const CategoryModalPage: FunctionComponent<CategoryModalPageProps> = ({
  data,
  onSelect
}) => {
  return (
    <div className="category-modal-container">
      {data.length == 0 ? (
        <img src="/media/loading.gif" alt="Loading..." className="loader" />
      ) : (
        <CategoriesMenu
          data={data}
          autoScale
          maxSize={700}
          onPress={onSelect}
        />
      )}
      <style jsx>{`
        .category-modal-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

interface TopicModalPageProps {
  onSelect: (topic: Topic) => void;
  data: Topic[];
}

const TopicModalPage: FunctionComponent<TopicModalPageProps> = ({
  data,
  onSelect
}) => {
  const [filteredTopics, setFilteredTopics] = useState(data);
  const [topicQuery, setTopicQuery] = useState("");
  const topicSearcher = createTopicSearcher();
  topicSearcher.addDocuments(data);

  useEffect(() => {
    setFilteredTopics(data);
  }, [data]);

  const filterTopics = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setFilteredTopics(data);
      setTopicQuery("");
    } else {
      setFilteredTopics(topicSearcher.search(e.target.value) as Topic[]);
      setTopicQuery(e.target.value);
    }
  };

  return (
    <div className="topic-page">
      <input
        type="text"
        name="filter"
        className="search-field"
        placeholder={"Filter by topic..."}
        value={topicQuery}
        onChange={filterTopics}
      />

      {data.length == 0 && (
        <img
          src="/media/loading.gif"
          alt="Loading..."
          className="loader"
          style={{ alignSelf: "center" }}
        />
      )}
      <div className="topic-list">
        {filteredTopics.map(topic => (
          <Button
            onClick={() => onSelect(topic)}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            {topic.name}
          </Button>
        ))}
      </div>
      <style jsx>
        {`
          .topic-page {
            display: flex;
            flex-direction: column;
          }
          .search-field {
            width: 100%;
            font-size: 18px;
            border-radius: 5px;
            height: 40px;
            border: 1px solid ${colors.BLACK};
            padding-left: 15px;
            margin: 10px 0;
          }
          .topic-list {
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  );
};

interface InfoModalType {
  link: string;
  isAuthor: boolean;
  email: string;
  name: string;
}

interface InfoModalPageProps {
  onComplete: (data: InfoModalType) => void;
}

interface FieldType {
  value: string;
  error: string;
}

const updateField = (
  field: FieldType,
  e: React.ChangeEvent<HTMLInputElement>
) => update(field, { value: { $set: e.target.value }, error: { $set: "" } });

const setError = (field: FieldType, error: string) =>
  update(field, { error: { $set: error } });
const InfoModalPage: FunctionComponent<InfoModalPageProps> = ({
  onComplete
}) => {
  const [link, setLink] = useState<FieldType>({ error: "", value: "" });
  const [isAuthor, setIsAuthor] = useState(false);
  const [email, setEmail] = useState<FieldType>({ error: "", value: "" });
  const [name, setName] = useState<FieldType>({ error: "", value: "" });

  const onAdd = () => {
    let isGood = true;
    if (!link.value.toLowerCase().match(LINK_REGEX)) {
      setLink(setError(link, "The link doesn't seem valid"));
      isGood = false;
    }
    if (!email.value.toLowerCase().match(EMAIL_REGEX)) {
      setEmail(setError(email, "The email doesn't seem valid"));
      isGood = false;
    }
    if (isGood)
      onComplete({
        link: link.value,
        isAuthor,
        email: email.value,
        name: name.value
      });
  };

  return (
    <div className="content-container">
      <div className="info-content">
        <label style={{ margin: "20px 0 10px 0", fontSize: 18 }}>
          RESOURCE's INFOs
        </label>
        <label htmlFor="link">Link*</label>
        <input
          type="text"
          value={link.value}
          onChange={e => setLink(updateField(link, e))}
        />
        {link.error && <label className="error">{link.error}</label>}
        <label>Are you the resource's author?</label>
        <div className="radio-container">
          <button onClick={() => setIsAuthor(true)}>
            <Radio value={isAuthor} />
            <label htmlFor="link">YES</label>
          </button>
          <button onClick={() => setIsAuthor(false)}>
            <Radio value={!isAuthor} />
            <label htmlFor="link">NO</label>
          </button>
        </div>
        <label style={{ margin: "20px 0 10px 0", fontSize: 18 }}>
          Your INFOs
        </label>
        <label htmlFor="link">Email*</label>
        <input
          type="text"
          value={email.value}
          onChange={e => setEmail(updateField(email, e))}
        />
        {email.error && <label className="error">{email.error}</label>}
        <label htmlFor="link" className="small">
          Insert your email so that we can be spam free. Thanks :)
        </label>
        <label htmlFor="link">Name</label>
        <input
          type="text"
          value={name.value}
          onChange={e => setName(updateField(name, e))}
        />
        <label htmlFor="link" className="small">
          Only if you want your name in the contributors page. Otherwise you can
          be anonymous
        </label>
      </div>
      <div className="action-bar">
        <Button onClick={onAdd}>ADD RESOURCE</Button>
      </div>
      <style jsx>{`
        .content-container {
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow: none;
        }
        .info-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow-y: auto;
        }
        label {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 16px;
          color: ${colors.PRIMARY_BLUE};
          margin-bottom: 4px;
        }
        label.small {
          font-size: 12px;
          color: ${colors.GRAY};
          margin-bottom: 10px;
        }
        label.error {
          font-size: 14px;
          color: ${colors.RED};
          margin-bottom: 5px;
        }
        input {
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid ${colors.BLACK};
          padding: 6px 10px;
          padding-left: 15px;
          margin-bottom: 10px;
        }
        .radio-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 10px 0;
        }
        .radio-container button {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 15px;
        }
        .radio-container label {
          margin: 0;
          margin-left: 5px;
        }
        .action-bar {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

const PAGES_META: PageMeta[] = [
  {
    title: "CHOOSE YOUR CATEGORY",
    subOption: "Can't find it here?"
  },
  {
    title: "Choose your Topic",
    subOption: "Can't find it here?"
  },
  {
    title: "Just a few infos"
  }
];

const Radio: FunctionComponent<{ value?: boolean }> = ({ value }) => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20">
      <circle
        cx={10}
        cy={10}
        r={9}
        strokeWidth={2}
        stroke={colors.PRIMARY_BLUE}
        fill={colors.WHITE}
      ></circle>
      {value && <circle cx={10} cy={10} r={9 / 2} fill={colors.PRIMARY_BLUE} />}
    </svg>
  );
};

/*

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
      axios
        .post(endpoints.TUTORIALS_RETRIEVE, {
          link: input.link,
          email: input.email,
          username: input.username,
          topic: topic
        })
        .then(() => {
          setPage(4);
        })
        .catch(() => {
          setPage(5);
        });
    } else {
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
  } else if (page == 4) {
    toShow = (
      <div>
        <span>Inviato</span>
      </div>
    );
  } else if (page == 5) {
    toShow = (
      <div>
        <span>Erroe</span>
      </div>
    );
  }

  return toShow;


*/

const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
