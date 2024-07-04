import firestore from "@react-native-firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ContactsList } from "../../../components/ContactsList";
import { AuthContext } from "../../../contexts/auth";
import { IUser } from "../../../interface";
import { Contacts, Container, FlatListContacts } from "./styles";

export const Pix: React.FunctionComponent = () => {
    const { user } = useContext(AuthContext);
    const [listUsers, setListUsers] = useState<IUser[]>([]);

    useEffect(() => {
        (async () => {
            firestore()
                .collection("users")
                .orderBy("name", "asc")
                .get()
                .then(value => {
                    let list = [];
                    setListUsers([]);
                    value.docs.map(dat => {
                        if (dat.id != user.uid) {
                            list.push({ ...dat.data(), uid: dat.id });
                        }
                    });
                    setListUsers(list);
                });
        })();
    }, [user.uid]);

    return (
        <Container>
            <Contacts>Contatos</Contacts>
            <FlatListContacts
                data={listUsers}
                renderItem={({ item }) => <ContactsList user={item} />}
            />
        </Container>
    );
};
