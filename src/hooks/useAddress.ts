export const useAddress = () => {
    const getShortAddress = (address: string) => {
        return (
            address.slice(0,4).concat("...").concat(
                address.slice(address.length - 4, address.length)
            )
        )
    };

    return { getShortAddress };
};