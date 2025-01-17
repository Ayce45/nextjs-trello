import List from '../molecules/List';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import React, { Key, useState } from 'react';
import Image from 'next/image';

import crossDark from 'assets/cross-dark.png';

type Props = {
  items: any;
  addList: any;
  removeList: any;
  addCard: any;
  followCard: any;
  removeCard: any;
  descriptionCard: any;
};

const ListContainer = ({
  items,
  addList,
  removeList,
  addCard,
  followCard,
  removeCard,
  descriptionCard,
}: Props) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (event.target.title.value !== '') {
      addList(event.target.title.value);
      event.target.title.value = '';
      setShowForm(false);
    }
  };

  const useOutsideClick = (callback: any) => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event: any) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);

    return ref;
  };

  const handleClickOutside = () => {
    setShowForm(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div className="mt-[6px] flex items-start gap-2">
      {items.map(
        (list: { id: any; title: string; cards: any[] }, index: Key) => (
          <List
            title={list.title}
            key={index}
            id={list.id}
            removeList={removeList}
            addCard={addCard}
          >
            {list.cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                follow={card.follow}
                list={list.title}
                followCard={followCard}
                removeCard={removeCard}
                descriptionCard={descriptionCard}
                id={card.id}
                listId={list.id}
              />
            ))}
          </List>
        )
      )}
      <form
        onSubmit={handleSubmit}
        // @ts-ignore
        ref={ref}
        className={
          (showForm
            ? 'bg-[#ebecf0] p-[4px]'
            : 'bg-[#ffffff3d] hover:bg-[#ffffff52]') +
          ' flex w-[272px] flex-col rounded-[3px]'
        }
      >
        {showForm && (
          <>
            <input
              autoFocus
              placeholder="Saisissez le titre de la liste…"
              type="text"
              name="title"
              id="title"
              className="h-[36px] rounded-[3px] border-[0px] border-transparent px-[12px] pl-[13px] shadow-[rgb(0_121_191)_0px_0px_0px_2px_inset] outline-none placeholder:text-[13.33px] placeholder:text-gray-500"
            />
            <div className="mt-1 flex items-center gap-3">
              <Button id="addList" type="primary" action="submit">
                Ajouter une liste
              </Button>
              <button
                className="flex items-center"
                onClick={() => setShowForm(false)}
              >
                <Image
                  src={crossDark}
                  alt="cross"
                  className="opacity-50 transition hover:opacity-100"
                />
              </button>
            </div>
          </>
        )}
        {!showForm && (
          <Button
            id="showListForm"
            type="tertiary"
            action="button"
            click={(e: any) => {
              e.stopPropagation();
              setShowForm(true);
            }}
          >
            Ajouter une autre liste
          </Button>
        )}
      </form>
    </div>
  );
};

export default ListContainer;
