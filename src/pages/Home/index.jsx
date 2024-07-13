import { useState, useEffect } from "react";
import categoryData from "../../data/DataCategory.json";
import { useVideoContext } from "../../Context/videoContexto";
import Loading from "../../components/Cargando";
import Modal from "../../components/Modal/modal";
import Category from "../../components/Category";
import Banner from "../../components/Banner/index.jsx";

function Home() {
    const { videos, deleteVideo, updateVideo } = useVideoContext();
    const [categories, setCategories] = useState([]);
    const [bannerCard, setBannerCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [categoryLookup, setCategoryLookup] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setCategories(categoryData);
    }, []);

    useEffect(() => {
        if (videos.length > 0) {
            setBannerCard(videos[0]);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [videos]);

    useEffect(() => {
        const lookup = categories.reduce((acc, category) => {
            acc[category.name] = category;
            return acc;
        }, {});
        setCategoryLookup(lookup);
    }, [categories]);

    const handleCardClick = (card) => {
        setBannerCard(card);
        document.getElementById('banner')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCardDelete = (cardId) => {
        deleteVideo(cardId);
        if (bannerCard && bannerCard.id === cardId) {
            setBannerCard(videos.length > 0 ? videos[0] : null);
        }
    };

    const handleCardEdit = (card) => {
        setCurrentCard(card);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSave = (updatedCard) => {
        updateVideo(updatedCard);
        setIsModalOpen(false);
    };

    return (
        isLoading ? <Loading /> : (
            <div className="home-container">
                {bannerCard && <Banner card={bannerCard} categoryLookup={categoryLookup} />}
                {categories.map(category => (
                    <Category
                        key={category.id}
                        datos={category}
                        cards={videos.filter(card => card.category === category.name)}
                        onCardClick={handleCardClick}
                        onCardDelete={handleCardDelete}
                        onCardEdit={handleCardEdit}
                    />
                ))}
                <Modal
                    card={currentCard}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            </div>
        )
    );
}

export default Home;
