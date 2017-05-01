package kasper.pagh.keebin;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;


import android.support.v4.app.DialogFragment;

import java.util.Calendar;

import com.google.gson.Gson;

import entity.User;
import rest.userReST.PutUser;

/**
 * Created by pelle on 12/6/2016.
 */


public class YourInfoFragment extends Fragment implements AsyncResponse
{
    private EditText newEmail;
    private EditText newPw;
    private EditText repeatPw;
    private EditText firstName;
    private EditText lastName;
    private RadioButton isMale;
    private RadioButton isFemale;
    private String birthDay;
    private EditText currentPw;
    private RadioGroup radioGrp;


    private static int mYear = 0;
    private static int mMonth = 0;
    private static int mDay = 0;
    private User userToSave;
    private Button saveButton;
    private AsyncResponse delegatePoint;

    private static Button picker;

    public static YourInfoFragment newInstance()
    {
        Bundle args = new Bundle();
        YourInfoFragment fragment = new YourInfoFragment();
        fragment.setArguments(args);
        return fragment;
    }


    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        final View view = inflater.inflate(R.layout.edit_user, container, false);
        delegatePoint = this;

        final LinearLayout editPasswordLayout = (LinearLayout) view.findViewById(R.id.editPasswordLayout);
        final LinearLayout editAboutMeLayout = (LinearLayout) view.findViewById(R.id.editAboutMeLayout);
        final LinearLayout editEmailLayout = (LinearLayout) view.findViewById(R.id.editEmailLayout);

        editPasswordLayout.setVisibility(View.GONE);
        editAboutMeLayout.setVisibility(View.GONE);
        editEmailLayout.setVisibility(View.GONE);

        Button editEmailButton = (Button) view.findViewById(R.id.editEmailButton);
        Button editPasswordButton = (Button) view.findViewById(R.id.editPasswordButton);
        Button editAboutMeButton = (Button) view.findViewById(R.id.editAboutMeButton);

        newEmail = (EditText) view.findViewById(R.id.emailEditField);
        newPw = (EditText) view.findViewById(R.id.editKodeord);
        repeatPw = (EditText) view.findViewById(R.id.editKodeordGentagelse);
        firstName = (EditText) view.findViewById(R.id.editFirstName);
        lastName = (EditText) view.findViewById(R.id.editLastName);
        isMale = (RadioButton) view.findViewById(R.id.radio_male);
        isFemale = (RadioButton) view.findViewById(R.id.radio_female);
        currentPw = (EditText) view.findViewById(R.id.currentPwField);
        radioGrp = (RadioGroup) view.findViewById(R.id.radioGrp);
        currentPw = (EditText) view.findViewById(R.id.currentPwField);


        Button datePickerEdit = (Button) view.findViewById(R.id.datePickerEdit);
        picker = datePickerEdit;


        editEmailButton.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                if (editEmailLayout.getVisibility() == View.GONE)
                {
                    editEmailLayout.setVisibility(View.VISIBLE);
                }
                else
                {
                    editEmailLayout.setVisibility(View.GONE);
                }
            }
        });

        editPasswordButton.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                if (editPasswordLayout.getVisibility() == View.GONE)
                {
                    editPasswordLayout.setVisibility(View.VISIBLE);
                }
                else
                {
                    editPasswordLayout.setVisibility(View.GONE);
                }
            }
        });

        editAboutMeButton.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                if (editAboutMeLayout.getVisibility() == View.GONE)
                {
                    editAboutMeLayout.setVisibility(View.VISIBLE);
                }
                else
                {
                    editAboutMeLayout.setVisibility(View.GONE);
                }
            }
        });

        datePickerEdit.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                showDatePickerDialog(v);
            }
        });
        saveButton = (Button) view.findViewById(R.id.saveEditButton);

        saveButton.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Log.d("EDIT", "her er curUsr: " + MainActivity.currentUser.toString());
                String day = mDay + "";
                String month = mMonth + "";
                birthDay = mYear + "-" + month + "-" + day + " 00:00:00";
                if (day.length() == 1)
                {
                    day = "0" + day;
                }
                if (month.length() == 1)
                {
                    month = "0" + month;
                }
                if (mMonth == 0)
                {
                    birthDay = MainActivity.currentUser.getBirthday();
                }
                if (mDay == 0)
                {
                    birthDay = MainActivity.currentUser.getBirthday();
                }
                if (mYear == 0)
                {
                    birthDay = MainActivity.currentUser.getBirthday();
                }

                String forNavn;
                if (firstName.getText().toString().equalsIgnoreCase(""))
                {
                    forNavn = MainActivity.currentUser.getFirstName();
                }
                else
                {
                    forNavn = firstName.getText().toString();
                }

                String efterNavn;
                if (lastName.getText().toString().equalsIgnoreCase(""))
                {
                    efterNavn = MainActivity.currentUser.getFirstName();
                }
                else
                {
                    efterNavn = lastName.getText().toString();
                }


                String ePost;
                if (newEmail.getText().toString().equalsIgnoreCase(""))
                {
                    ePost = MainActivity.currentUser.getEmail();
                }
                else
                {
                    ePost = newEmail.getText().toString();
                }

                String sex = MainActivity.currentUser.getSex();
                if (radioGrp.getCheckedRadioButtonId() == isFemale.getId())
                {
                    sex = "Kvinde";
                }
                if (radioGrp.getCheckedRadioButtonId() == isMale.getId())
                {
                    sex = "Mand";
                }

                int roleId = 2;

                String password;
                if (newPw.getText().toString() != null && !newPw.getText().toString().equals("") && newPw.equals(repeatPw))
                {
                    password = newPw.getText().toString();
                }
                else
                {
                    password = currentPw.getText().toString();
                }


//                Log.d("EDIT", "her er date: " + mMonth + mDay + mYear); 2010-09-08 18:00:00
//                //(String firstName, String lastName, String email, String birthday, String sex, int roleId, String password)
                userToSave = new User(forNavn,efterNavn,ePost,birthDay,sex,roleId,password);
                Log.d("EDIT", "her er usrToSave: " + userToSave);
                PutUser pu = new PutUser(currentPw.getText().toString(),userToSave, delegatePoint, getActivity(), getResources().getString(R.string.baseUrl), MainActivity.currentUser.getEmail());
                pu.execute();
            }
        });


        return view;
    }


    @Override
    public void processFinished(String output)
    {
        Log.d("EDIT", "her er res: " +output);
        if (output.startsWith("Fejl:"))
        {
            Toast.makeText(getActivity(), output.substring(5), Toast.LENGTH_LONG).show();
        }
        else
        {
            Gson gson = new Gson();
            User user = gson.fromJson(output, User.class);
            Log.d("EDIT", "ny usr: " +user.toString());
            Log.d("EDIT", "gammel usr: " + MainActivity.currentUser.toString());
            Toast.makeText(getActivity(), "Profil redigeret", Toast.LENGTH_LONG).show();
//            MainActivity.currentUser = user;
        }
    }


    public static void setDates(int year, int month, int day)
    {
        mYear = year;
        mMonth = month;
        mDay = day;
        picker.setText(day + "/" + month + "/" + year);
    }

    public void showDatePickerDialog(View v)
    {
        DialogFragment newFragment = new DatePickerFragment();
        newFragment.show(getActivity().getSupportFragmentManager(), "datePicker");
    }

    public static class DatePickerFragment extends DialogFragment
            implements DatePickerDialog.OnDateSetListener
    {

        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState)
        {
            // Use the current date as the default date in the picker
            final Calendar c = Calendar.getInstance();
            int year = c.get(Calendar.YEAR);
            int month = c.get(Calendar.MONTH);
            int day = c.get(Calendar.DAY_OF_MONTH);

            // Create a new instance of DatePickerDialog and return it
            return new DatePickerDialog(getActivity(), this, year, month, day);
        }

        public void onDateSet(DatePicker view, int year, int month, int day)
        {
            setDates(year, month, day);

        }
    }

}
