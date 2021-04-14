package com.intellective.unity.controller;

import com.intellective.unity.Utils;
import org.apache.commons.codec.binary.Base64;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Nullable;

@RestController
public class SharedLinkController {
    private static final String PERSPECTIVE_ID = "resourceView";

    private enum Index {
        resourceName,
        resourceLink,
        users
    }

    @RequestMapping(value = "shared", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView openLink(@RequestParam("hash") String hash, ModelMap model, Authentication authentication) {

        JSONArray resourceParams = new JSONArray(Utils.decrypt(hash));

        model.addAttribute("p", PERSPECTIVE_ID);

        JSONArray users = resourceParams.optJSONArray(Index.users.ordinal());
        if (!authorizationCheck(users, authentication)) {
            model.addAttribute("error", "You are not authorized to access this resource");
        } else {
            model.addAttribute("context", prepareContext(resourceParams));
        }

        return new ModelAndView("redirect:/", model);
    }

    private boolean authorizationCheck(@Nullable JSONArray users, Authentication auth) {
        String currentUserName;
        if (auth == null || users == null || users.isEmpty() || (currentUserName = auth.getName()) == null) {
            return true;
        }
        for (Object user : users) {
            if (currentUserName.equals(user)) {
                return true;
            }
        }
        return false;
    }

    private String prepareContext(JSONArray resourceParams) {
        JSONObject context = new JSONObject();
        context.put(Index.resourceName.toString(), resourceParams.getString(Index.resourceName.ordinal()));
        context.put(Index.resourceLink.toString(), resourceParams.getString(Index.resourceLink.ordinal()));

        return Base64.encodeBase64String(context.toString().getBytes());
    }
}
