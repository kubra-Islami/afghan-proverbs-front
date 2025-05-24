import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import offline from "../img/notFound/offline.webp";

const OfflineBanner = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (isOnline) return null;

    return (
        <div className="text-center mt-5">
            <Image
                src={offline}
                alt="Offline"
                fluid
                className="mb-4"
                style={{ maxHeight: "300px" }}
            />
            <h3 style={{ fontWeight: "700" }}>Unable to fetch proverbs</h3>
            <p>You may be offline, or there might be a temporary issue on our side. Try refreshing the page in a moment.</p>
            <div>
                <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={() => window.location.reload()}
                >
                    ⬅ Retry
                </Button>
            </div>
        </div>
    );
};

export default OfflineBanner;
