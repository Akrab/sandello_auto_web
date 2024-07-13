import React, { useState } from "react";
import { CreateNewLocalWarehouse } from "../api/localwarehouse";


export const CreateLocalWarehouseContext = React.createContext({});

export const CreateLocalWarehouseProvider = ({ children }) => {

    const [newWarehouseObj, setNewWarehouseObj] = useState({ rooms : {}, name : "",description : "" });
    const [loadingStatus, setLoadingStatus] = useState("NONE");
    const [textError, setTextError] = useState("");
    
    async function CreateWarehouse(name, description) {

        var obj = newWarehouseObj;
        obj.name = name;
        obj.description = description;

        setLoadingStatus("LOADING")
        const res = await CreateNewLocalWarehouse(obj);

        if (!res || res.status === "error") { 
            
            setTextError("Ошибка сети")
            return setLoadingStatus("ERROR");}

        var added = res.result.added;
        var badName = res.result.badName;

        if (badName) {
            setLoadingStatus("BAD_NAME");
            return;
        }

        if (added == false){
            setTextError(res.result.error)
            setLoadingStatus("ERROR");
        }

        setLoadingStatus("SUCCESS");

    }

    function CloseAlert(){
        setTextError("")
        setLoadingStatus("NONE")
    }

    function AddRoom(name) {
        name = CheckInputText(name)
        if (name == null || name == "")
            return;


        if(newWarehouseObj == null)
            setNewWarehouseObj({ rooms : {}, name : "",description : "" });

        var rooms = newWarehouseObj.rooms;
        if (rooms == null)
            rooms = {};

        if (rooms[name] != null) return;

        for (var key in rooms) {
            rooms[key].isSelect = false;
        }

        rooms[name] = {
            isSelect: true,
            racks: {}
        };

        setNewWarehouseObj(newWarehouseObj);
    }

    function AddRack(name) {

        name = CheckInputText(name)
        if (name == null || name == "")
            return;


        var roomName = GetSelectRoomName();
        var rooms = newWarehouseObj.rooms;
        var room = rooms[roomName];
        if (room == null) return;


        for (var key in room.racks) {
            room.racks[key].isSelect = false;
        }

        room.racks[name] = {
            isSelect: true,
            shelves: {}
        }

        rooms[roomName] = room;

        setNewWarehouseObj(newWarehouseObj);
    }

    function AddShelf(name) {

        var roomName = GetSelectRoomName();
        var rackName = GetSelectRack();

        var rooms = newWarehouseObj.rooms;

        for (var key in rooms[roomName].racks[rackName].shelves) {
            rooms[roomName].racks[rackName].shelves[key].isSelect = false;
        }

        rooms[roomName].racks[rackName].shelves[name] = {
            isSelect: true,
            boxes: {}
        }

        setNewWarehouseObj(newWarehouseObj);
    }

    function AddBox(name) {
        var roomName = GetSelectRoomName();
        var rackName = GetSelectRack();
        var shelfName = GetSelectShelf();

        var rooms = newWarehouseObj.rooms;

        for (var key in rooms[roomName].racks[rackName].shelves[shelfName].boxes) {
            rooms[roomName].racks[rackName].shelves[shelfName].boxes[key].isSelect = false;
        }

        rooms[roomName].racks[rackName].shelves[shelfName].boxes[name] = {
            isSelect: true,
        }

        setNewWarehouseObj(newWarehouseObj);

    }


    function SelectRoom(name) {
        var rooms = newWarehouseObj.rooms;

        for (var key in rooms) {
            rooms[key].isSelect = false;
        }
        if (rooms[name] != null)
            rooms[name].isSelect = true;

        setNewWarehouseObj(newWarehouseObj);
    }

    function SelectRack(name) {

        var rooms = newWarehouseObj.rooms;
        var roomName = GetSelectRoomName();

        var room = rooms[roomName];

        for (var key in room.racks) {
            room.racks[key].isSelect = false;

        }

        if (room.racks[name] != null)
            room.racks[name].isSelect = true;
        setNewWarehouseObj(newWarehouseObj);
    }

    function GetSelectRoomName() {
        var rooms = newWarehouseObj.rooms;

        for (var key in rooms) {

            if (rooms[key].isSelect)
                return key;
        }
        return null;
    }

    function GetSelectRack() {
        var roomName = GetSelectRoomName();
        if (newWarehouseObj.rooms[roomName] == null) return null;

        try {
            var racks = newWarehouseObj.rooms[roomName].racks;

            for (var key in racks) {

                if (racks[key].isSelect)
                    return key;
            }
        } catch {
            return null;
        }
        return null;

    }

    function GetSelectShelf() {

        var roomName = GetSelectRoomName();
        var rackName = GetSelectRack();
        try {
            var shelves = newWarehouseObj.rooms[roomName].racks[rackName].shelves;

            for (var key in shelves) {

                if (shelves[key].isSelect)
                    return key;
            }
        } catch {
            return null;
        }
        return null;

    }

    function GetSelectBox() {

        var roomName = GetSelectRoomName();
        var rackName = GetSelectRack();
        var shelfName = GetSelectShelf();

        try {
            var boxes = newWarehouseObj.rooms[roomName].racks[rackName].shelves[shelfName].boxes;

            for (var key in boxes) {

                if (boxes[key].isSelect)
                    return key;
            }
        } catch {
            return null;
        }
        return null;
    }


    function SelectShelf(name) {
        var roomName = GetSelectRoomName();
        var rackName = GetSelectRack();

        var rooms = newWarehouseObj.rooms;
        var shelves = rooms[roomName].racks[rackName].shelves;

        for (var key in shelves)
            shelves[key].isSelect = false

        shelves[name].isSelect = true

        setNewWarehouseObj(newWarehouseObj);

    }

    function SelectBox(name) {
        var roomName = GetSelectRoomName();
        var rackName = GetSelectRack();
        var shelfName = GetSelectShelf();

        var rooms = newWarehouseObj.rooms;
        var boxes = rooms[roomName].racks[rackName].shelves[shelfName].boxes;

        for (var key in boxes)
            boxes[key].isSelect = false

        boxes[name].isSelect = true

        setNewWarehouseObj(newWarehouseObj);
    }

    function RemoveRoom() {
        var rooms = newWarehouseObj.rooms;
        var roomName = GetSelectRoomName();
        delete rooms[roomName]


        for (var key in rooms) {
            rooms[key].isSelect = true;
            break;
        }
        setNewWarehouseObj(newWarehouseObj);
        return roomName;
    }

    function RemoveRack() {
        var rooms = newWarehouseObj.rooms;
        var roomName = GetSelectRoomName();

        var rackName = null;
        for (var key in rooms[roomName].racks) {
            if (rooms[roomName].racks[key].isSelect) {
                rackName = key;
                break;
            }


        }

        delete rooms[roomName].racks[rackName]

        for (var key in rooms[roomName].racks) {
            rooms[roomName].racks[key].isSelect = true;
            break;
        }

        setNewWarehouseObj(newWarehouseObj);
        return rackName;
    }

    function RemoveShelf() {
        var rooms = newWarehouseObj.rooms;
        var roomName = GetSelectRoomName();

        var rackName = null;
        for (var key in rooms[roomName].racks) {
            if (rooms[roomName].racks[key].isSelect) {
                rackName = key;
                break;
            }


        }

        var shelves = rooms[roomName].racks[rackName].shelves
        var shelveName = null;
        for (var key in shelves) {
            if (shelves[key].isSelect) {
                shelveName = key;
                break;
            }


        }

        if (shelveName != null)
            delete rooms[roomName].racks[rackName].shelves[shelveName]

        for (var key in shelves) {
            shelves[key].isSelect = true;
            break;
        }

        setNewWarehouseObj(newWarehouseObj);
        return shelveName;
    }

    function RemoveBox() {
        var roomName = GetSelectRoomName();
        var rackName = GetSelectRack();
        var shelfName = GetSelectShelf();
        var boxName = GetSelectBox();

        var rooms = newWarehouseObj.rooms;


        delete rooms[roomName].racks[rackName].shelves[shelfName].boxes[boxName]
        for (var key in rooms[roomName].racks[rackName].shelves[shelfName].boxes) {
            rooms[roomName].racks[rackName].shelves[shelfName].boxes[key].isSelect = true;
            break
        }

        setNewWarehouseObj(newWarehouseObj);
        return boxName;
    }

    function CheckInputText(data) {

        if (data == null || data == "") return null;
        var startTextIndex = -1;
        for (var i = 0; i < data.length; i++) {
            if (data[i] == ' ') continue;
            startTextIndex = i;
            break;
        }

        if (startTextIndex == -1) return null;
        return data.substring(startTextIndex, data.length);
    }

    const value = {
        CreateWarehouse, loadingStatus,
        newWarehouseObj, AddRoom, AddRack, AddShelf, AddBox, SelectRoom, SelectRack, SelectShelf,
        SelectBox, RemoveRoom, RemoveRack, RemoveRack, RemoveShelf, RemoveBox, textError, CloseAlert
    };

    return (<CreateLocalWarehouseContext.Provider value={value} >{children}</CreateLocalWarehouseContext.Provider>)
};



export const useCreateLocalWarehouseProvider = () => React.useContext(CreateLocalWarehouseContext);