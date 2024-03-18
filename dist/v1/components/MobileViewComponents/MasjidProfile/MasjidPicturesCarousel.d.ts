type propsType = {
    MasjidPhotos: {
        url: string;
        _id: string;
    }[];
    MasjidId: string;
    setUploadAllow: (val: boolean) => void;
};
declare const MasjidPicturesCarousel: ({ MasjidPhotos, MasjidId, setUploadAllow, }: propsType) => JSX.Element;
export default MasjidPicturesCarousel;
//# sourceMappingURL=MasjidPicturesCarousel.d.ts.map