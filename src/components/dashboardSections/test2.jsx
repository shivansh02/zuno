import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import * as React from "react";

const cards = [
  {
    id: 1,
    title: "title1",
    content: "description2da",
    time: "4:40",
    date: "12th Decemeber 2022",
    priority: "high",
  },
  {
    id: 2,
    title: "title2",
    content: "description2",
    time: "4:40",
    date: "12th Decemeber 2022",
    priority: "high",
  },
];

const Card = ({ card, onSelect }) => {
  return (
    <motion.div
      layoutId={`card_${card.id}`}
      onClick={onSelect}
      className="card"
      style={{ borderRadius: 10 }}
    >
      <motion.div layoutId={`card_title_${card.id}`} className="titleBar">
        <motion.p layoutId={`card_text_${card.id}`} layout="position">
          {card.title}
        </motion.p>
      </motion.div>
      <motion.div layoutId={`card_content_${card.id}`} className="contentBox">
        <motion.p
          layoutId={`card_content_text_${card.id}`}
          className="content"
          layout="position"
        >
          {card.content}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export const Example = () => {
  const [selectedCard, setSelectedCard] = React.useState(null);
  return (
    <MotionConfig
      transition={{ duration: 0.85, type: "tween", ease: "easeInOut" }}
    >
      <motion.div className="cards">
        {cards.map((card, index) => {
          return (
            <Card
              key={card.content}
              card={card}
              onSelect={() => setSelectedCard(card)}
            />
          );
        })}
      </motion.div>
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            layoutId={`card_${selectedCard.id}`}
            className="expandedCard"
            onClick={() => setSelectedCard(null)}
            style={{ borderRadius: 20 }}
          >
            <motion.div
              layoutId={`card_title_${selectedCard.id}`}
              className="expandedTitleBar"
            >
              <motion.p layoutId={`card_text_${selectedCard.id}`}>
                {selectedCard.title}
              </motion.p>
            </motion.div>
            <motion.div
              layoutId={`card_content_${selectedCard.id}`}
              className="expandedContentBox"
            >
              <motion.p
                layoutId={`card_content_text_${selectedCard.id}`}
                className="expandedContent"
                layout="position"
              >
                {selectedCard.content}
              </motion.p>
              <motion.img
                exit={{ opacity: 0 }}
                layout
                width={600}
                height={300}
                src={selectedCard.src}
                alt=""
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};
